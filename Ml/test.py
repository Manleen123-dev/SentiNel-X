from scapy.all import sniff,IP
data=[]
def process(packet):
    if packet.haslayer(IP):
        ip=packet.getlayer(IP)
        features=[
            len(packet),
            ip.proto
        ]
        print("Features:",features)
        data.append(features)
sniff(prn=process,count=10)
print("\nCollected Data :")
print(data)
