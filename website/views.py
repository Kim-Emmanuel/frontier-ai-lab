from django.shortcuts import render

# Create your views here.
def landing(request):
	return render(request, 'landing.html')

def about(request):
	return render(request, 'about.html')

def careers(request):
	return render(request, 'careers.html')

def work(request):
	return render(request, 'work.html')
