# mock-page
## Quick start with django server:

* Create a table 'infomanager' in your MySQL database
* Edit `/etc/my.cnf` with the required information
```
[client]
database = infomanager
user = <yourUsername>
password = <yourPassword>
default-character-set = utf8
```
* In your terminal:
```
source venv/bin/activate
cd infomanager
python manage.py runserver 80
```

* In new terminal
```
cd infomanager/frontend
npm run-script build
```
Open `localhost` in your browser
