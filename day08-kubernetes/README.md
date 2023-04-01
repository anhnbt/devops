# Kubernetes

## Thay đổi hostname của server cài docker thành: c1-cp1

sudo hostnamectl set-hostname c1-cp1
sudo vim /etc/hosts
sudo reboot


## Cài thêm 2 server ubuntu với hostname c1-node1, c1-node2

1. Đổi tên hostname: ```sudo hostnamectl set-hostname c1-node1```
2. Sửa file /etc/hosts: ```sudo vim /etc/hosts``` sau đó tìm và thay hostname mới: ```127.0.1.1 c1-node1```
3. Reboot system để thay đổi có hiệu lực: ```sudo reboot```
4. Kiểm tra hostname: ```hostnamectl```