vagrant ssh

sudo nano /etc/mysql/my.cnf

Promeniti "bind-address = 127.0.0.1" na "bind-address = 0.0.0.0"

sudo service mysql restart

================================================

mysql -u root -pstrangehat

create user 'root'@'10.0.2.2' identified by 'root';
grant all privileges on *.* to 'root'@'10.0.2.2' with grant option;
flush privileges;
