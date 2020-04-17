# mock-page
## Quick start with django server:

* Create a database 'infomanager' in your MySQL database
```
mysql> CREATE DATABASE infomanager;
mysql> SHOW DATABASES;
mysql> EXIT;
```
* You may wish to create a user & provide priveleges to the database and test database:
```
mysql> CREATE USER '<yourUsername>'@'localhost' IDENITIFIED BY '<yourPassword>'
mysql> GRANT ALL PRIVILEGES ON infomanager.* TO '<yourUsername>'@'localhost';
mysql> GRANT ALL PRIVILEGES ON test_infomanager.* TO '<yourUsername>'@'localhost';
```
* Edit `/etc/my.cnf` with the required information
```
[client]
database = infomanager
user = <yourUsername>
password = <yourPassword>
default-character-set = utf8
```
* Create virtual python environment & install dependencies:
```
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```
* Apply migrations, in your terminal:
```
cd infomanager
python manage.py migrate
```
* Start the backend server:
```
python manage.py runserver 80
```

* In new terminal
```
cd infomanager/frontend
npm install
npm run-script build
```
*These frontend build files will be served by the backend*  
Open `localhost` in your browser to view the page

## Testing
### Backend
Activate virtual environment, cd into main backend folder and run tests:
```
source venv/ben/activate
cd infomanager
python manage.py test
```
### Frontend
cd into frontend folder and run tests:
```
cd infomanager/frontend
npm run-script test
```
