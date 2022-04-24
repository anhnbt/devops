## Kubernetes

Tạo *Vagrantfile* với nội dung như sau:
```
Vagrant.configure("2") do |config|
    config.vm.provision "shell", inline: "echo A"

    config.vm.define "master" do |master|
        master.vm.box = "centos/7"
        master.vm.hostname = "k8s-master"
        master.vm.network "private_network", ip: "192.168.50.4"
        master.vm.provider "virtualbox" do |v|
            v.name = "my_vm_master"
            v.memory = 2048
            v.cpus = 2
        end
    end

    config.vm.define "worker" do |worker|
        worker.vm.box = "centos/7"
        worker.vm.hostname = "k8s-worker"
        worker.vm.network "private_network", ip: "192.168.50.5"
        worker.vm.provider "virtualbox" do |v|
            v.name = "my_vm_worker"
            v.memory = 2048
            v.cpus = 2
        end
    end

    config.vm.provision :shell, inline: "echo C"
end
```

- Khởi tạo máy ảo với câu lệnh: `vagrant up`
- Kiểm tra trạng thái của vagrant với câu lệnh: `vagrant status`
- Truy cập vào máy ảo đã cấu hình bên trong *Vagrantfile* với câu lệnh: `vagrant ssh master` hoặc `vagrant ssh worker`
- Thay đổi quyền truy cập sang tài khoản *root* với câu lệnh: `sudo su`
- Để thoát máy ảo gõ câu lệnh: `logout`
- Để xóa máy ảo gõ câu lệnh: `vagrant destroy`
- Sau khi cập nhật thay đổi trong Vagrantfile phải gõ câu lệnh: `vagrant reload`
- Tạm dừng máy ảo và lưu trạng thái hoạt động: `vagrant suspend`

## Bắt đầu cài đặt Kubernetes
### Cài đặt kubectl trên CentOS/7
`kubectl` là công cụ command-line trong Kubernetes

- Thực thi các câu lệnh trong Kubernetes clusters.
- Triển khai các ứng dụng
- Theo dõi và quản lý tài nguyên của cluster và xem log

## Setting Hostname
Trong Vagrantfile đã cấu hình hostname *k8s-master* và *k8s-worker*
Để truy cập được bằng hostname đã khai báo trong Vagrantfile chúng ta phải cập nhật vào file `/etc/hosts`
- sudo vi /etc/hosts
- 192.168.50.4 k8s-master k8s-master.local
- 192.168.50.5 k8s-worker k8s-worker.local

| Ghi chú  | Câu lệnh |
| ------------- | ------------- |
| Mở & sửa file  | vi deployment.yaml  |
| Cập nhật  | kubectl apply -f deployment.yaml  |
| Lấy  | kubectl get pod  |
| Lấy = namespace  | kubectl get pod -n dev  |
| Xóa  | kubectl delete pod [name]  |
| Xóa  | kubectl delete pod [name] -n dev  |