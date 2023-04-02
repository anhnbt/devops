# Ansible

## Playbook Example Ping

create file `vim example-ping.yaml`

```
---
- hosts: apiserver
  tasks: 
    - name: Ping check host
      ping: 
```
shell: `ansible-playbook -i /etc/ansible/hosts example-ping.yaml -v`

## Playbook Example Ping with Parameter

create file `vim ping-hosts.yaml`

```
---
- hosts: "{{ hostname }}"
  gather_facts: yes
  become: yes
  tasks:
    - ping:
```
shell: `ansible-playbook -i /etc/ansible/hosts ping-hosts.yaml -e hostname=apiserver,webservers -v`

## Syntax check

`ansible-playbook example-ping.yaml --syntax-check`

## Apache

playbook:

```
---
- hosts: apiserver
  tasks:
    - name: Ping check host
      ping: ~
    - name: Install Apache
      yum: name=httpd update_cache=yes
    - name: Start Apache
      service: name=httpd state=started
```

shell: `ansible-playbook -i /etc/ansible/hosts install-apache.yaml -v`

## Nginx
shell: `ansible-playbook -i /etc/ansible/hosts install-nginx -v > install-nginx.log`

## Example Loop
shell: `ansible-playbook -i /etc/ansible/hosts example-loop.yaml -vvvv`
shell: netstat -tunlp

Install Net Tools: `yum install net-tools`