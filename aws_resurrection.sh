#!/bin/bash
aws ec2 reboot-instances --instance-ids `aws ec2 describe-instances --filters "Name=tag:Name,Values=fitmate"|grep -w "InstanceId" | cut -d '"' -f4`

echo "instance id=`aws ec2 describe-instances --filters "Name=tag:Name,Values=fitmate"|grep -w "InstanceId" | cut -d '"' -f4`"
echo "\n\n=============\n HAVE TO WAIT 60 SEC FOR INSTANCE REBOOT \n==============\n\n"
sleep 60
ssh-keygen -R 43.200.20.25
ssh -i "fitmate_credential.pem" ubuntu@43.200.20.25
#echo -e "ubuntu\n"|su -
#./resurrection.sh
