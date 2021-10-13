scp -i "C:/keys/myworkspace.pem" -r ./build/libs/service1*.jar ubuntu@ec2-3-34-241-52.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/app/service1
scp -i "C:/keys/myworkspace.pem" -r ./run.sh ubuntu@ec2-3-34-241-52.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/app/service1
ssh -i "C:/keys/myworkspace.pem" ubuntu@ec2-3-34-241-52.ap-northeast-2.compute.amazonaws.com "sudo chmod 777 /home/ubuntu/app/service1/run.sh"
ssh -i "C:/keys/myworkspace.pem" ubuntu@ec2-3-34-241-52.ap-northeast-2.compute.amazonaws.com "cd /home/ubuntu/app/service1; ./run.sh service1"