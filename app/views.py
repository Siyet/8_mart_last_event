from django.shortcuts import render

# Create your views here.
def startPage(request):
    return render(request, 'app/base.html', {})