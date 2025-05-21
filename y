#!/bin/bash

#Defining the variables
username=""
companyName=""
pin=""

for i in {1..3};do
	if ["$i" -eg 1 ]; then
		echo "Enter your username: "
		read username
	elif [ "$i -eg 2" ]; then
		echo "Ener Your company name: "
		read companyName
	else echo "Enter your PIN: "
		read pin
	fi
done

if [ "$username" = "john" ] && [ "companyName" = "TryHackMe"] && [ "$pin" = "1234"]; then
	echo "Authentication successful. You can access your locker, John."
else 
	echo "Authentication Denied!!"
fi

