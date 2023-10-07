from django import forms
from .models import Cliente

class ClienteForm(forms.ModelForm):
    class Meta:
        model = Cliente
        fields ='__all__'
        exclude = ['estado']
        widgets = {
            'fecha_alta': forms.DateInput(attrs={'type': 'date'})
        }

class LoginForm(forms.Form):
    username = forms.CharField(
        max_length=100,
        widget=forms.TextInput(
            attrs={"class": "form-control", "placeholder": "Ingrese su usuario", "autocomplete": "off", "id":"username", "name":"username"}
        ),
    )
    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={"class": "form-control", "placeholder": "Contraseña", "autocomplete": "off"}
        )
    )
