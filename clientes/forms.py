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