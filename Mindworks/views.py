from django.shortcuts import render
from django.contrib import auth
from django.contrib.staticfiles import *
import pyrebase

config = {
    'apiKey': "AIzaSyDo8y2hjc1_hcPMBYr_BxbWr6wu0gYhsZc",
    'authDomain': "mindworks-72373.firebaseapp.com",
    'databaseURL': "https://mindworks-72373.firebaseio.com",
    'projectId': "mindworks-72373",
    'storageBucket': "mindworks-72373.appspot.com",
    'messagingSenderId': "760797180366",
    'appId': "1:760797180366:web:25993cc471039d4de47b9f",
    'measurementId': "G-DCEPYXC9Q9"
    }

firebase = pyrebase.initialize_app(config)

authen = firebase.auth()
database = firebase.database()

# login function
def login(request): 
    return render(request, "login.html")

# main page display for post login
def postlogin(request):
    # saves credentials of user logging in 
    email=request.POST.get('email')
    password=request.POST.get("password")

    # checks authentication with try/except block
    # sends message if credentials are entered incorrectly
    try:
        user=authen.sign_in_with_email_and_password(email, password)
    except:
        message="Invalid Credentials"
        return render(request, "login.html", {"message":message})
    print(user['idToken'])

    # requesting a session
    session_id=user['idToken']
    request.session['uid']=str(session_id)

    return render(request, "menu.html", {"e":email})

# logout function
def logout(request):
    auth.logout(request)
    return render(request, "login.html")

def signup(request):
    return render(request, "signup.html")

def postsignup(request):
    name=request.POST.get('name')
    email=request.POST.get('email')
    password=request.POST.get("password")

    try: 
        # create new account
        user=authen.create_user_with_email_and_password(email, password)
    except:
        message="Account could not be created. Make sure account does not already exist."
        return render(request, "signup.html", {"message": message})

    # get localId of user. if issues, place under except block
    uid = user['localId']

    # get data, status "1" means user account is active
    data = {"name":name, "status":"1"}

    # add data to database under "users"
    database.child("users").child(uid).child("details").set(data)
    return render(request, "login.html")

#game function/page
def game(request):
    return render(request, "gameimport.html")

# user profile
def home(request):
    user = database.child("users").get()
    print(user.val())
    
    email=request.POST.get("email")
    name=request.POST.get("name")
    return render(request, "profile.html", {"email": email, "name": name})

# levels
def levels(request):
    return render(request, "levels.html")
