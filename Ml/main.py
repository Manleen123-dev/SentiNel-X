import datetime
import pickle
import requests
from queue import Queue
from threading import Thread
from scapy.all import sniff, IP, TCP


# Load model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

# Clear log file
open("log.txt", "w").close()

# Queue
packet_queue = Queue(maxsize=1000)

# SYN tracker
syn_count = {}

# Trim logs
def trim_logs():
    with open("log.txt", "r") as f:
        lines = f.readlines()

    if len(lines) > 200:
        with open("log.txt", "w") as f:
            f.writelines(lines[-100:])

# Producer
def process(packet):
    if not packet_queue.full():
        packet_queue.put(packet)

# Consumer
def worker():
    while True:
        packet = packet_queue.get()

        try:
            if packet.haslayer(IP):
                ip = packet.getlayer(IP)
                src_ip = ip.src

                features = [[0, ip.proto, len(packet), 0]]
                prediction = model.predict(features)

                status = "normal"

                if prediction[0] == 1:
                    status = "suspicious"

                if packet.haslayer(TCP):
                    tcp = packet[TCP]
                    if tcp.flags == "S":
                        syn_count[src_ip] = syn_count.get(src_ip, 0) + 1

                        if syn_count[src_ip] > 20:
                            print(f"🚨 SYN Flood Attack from {src_ip}")
                            status = "suspicious"

                # ✅ LOGGING (IMPORTANT FOR DASHBOARD)
                log_entry = f"{datetime.datetime.now()} | {src_ip} | {status}\n"
                with open("log.txt", "a") as f:
                    f.write(log_entry)

                trim_logs()

                # ✅ SEND TO BACKEND
                try:
                    requests.post(
                        "http://localhost:3000/packet",
                        json={
                            "status": status,
                            "features": features,
                            "src_ip": src_ip,
                            "protocol": ip.proto,
                            "time": str(datetime.datetime.now())
                        },
                        timeout=0.5
                    )
                except:
                    print("Backend not reachable")

                if status == "suspicious":
                    print(f"⚠️ Suspicious Packet from {src_ip}")
                else:
                    print(f"✅ Normal Packet from {src_ip}")

        except Exception as e:
            print("Error:", e)

        packet_queue.task_done()

# Start workers
for _ in range(4):
    Thread(target=worker, daemon=True).start()

# Start sniffing
sniff(prn=process, filter="ip", store=0)