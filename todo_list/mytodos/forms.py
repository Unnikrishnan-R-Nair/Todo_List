from django import forms 

from mytodos.models import Task

from django.contrib.auth.models import User

from django.contrib.auth.forms import UserCreationForm

from django.contrib.auth import password_validation

class TaskForm(forms.ModelForm):

    class Meta:

        model = Task

        #fields = '__all__'

        exclude = ('user','date_created')

        widgets = {
            
            'title': forms.TextInput(attrs={'class': 'form-control mb-3'}),

            'description': forms.Textarea(attrs={'class': 'form-control mb-3', 'rows':4}),

            'completed': forms.CheckboxInput(attrs={'class': 'form-check'}),

        }


class RegisterForm(UserCreationForm):

    password1 = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}), label="Password", 
                                help_text=password_validation.password_validators_help_text_html(),)
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}), label='Confirm password')

    class Meta:

        model = User

        fields = ['username', 'email', 'password1', 'password2']

        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control mb-3'}),
            'email': forms.EmailInput(attrs={'class': 'form-control mb-3'}),
            

        }


class LoginForm(forms.Form):

    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}))

    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}))


