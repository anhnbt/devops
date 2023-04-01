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