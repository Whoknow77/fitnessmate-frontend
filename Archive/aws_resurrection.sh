#!/bin/bash
#aws ec2 reboot-instances --instance-ids `aws ec2 describe-instances --filters "Name=tag:Name,Values=fitmate"|grep -w "InstanceId" | cut -d '"' -f4`

echo `aws ec2 describe-instances --filters "Name=tag:Name,Values=fitmate"|grep -w "InstanceId" | cut -d '"' -f4`
ssh-keygen -R 43.202.36.104
ssh -i "fitmate_credential.pem" ubuntu@43.202.36.104
# echo -e "ubuntu\n"|su -
# ./resurrection.sh
