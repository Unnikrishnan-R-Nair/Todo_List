from django.shortcuts import render, redirect

from django.views.generic import View

from mytodos.models import Task

from mytodos.forms import TaskForm, RegisterForm, LoginForm

from django.contrib.auth.models import User

from django.contrib.auth import authenticate, login, logout

from django.utils import timezone

from django.db.models import Count

from django.contrib import messages

from mytodos.decorators import signin_required

from django.utils.decorators import method_decorator



# Create your views here.

@method_decorator(signin_required, name='dispatch')
class HomeView(View):

    def get(self, request, *args, **kwargs):

        qs = Task.objects.filter(user=request.user)

        completed_tasks = qs.filter(completed=True)

        pending_tasks = qs.filter(completed=False)

        completed_count = completed_tasks.aggregate(total_count=Count("id"))

        pending_count = pending_tasks.aggregate(total_count=Count("id"))

        # print(completed_count)
        # print(pending_count)

        group_by_count = Task.objects.filter(user=request.user).values('completed').annotate(total=Count("id"))
        # print(group_by_count)

        all_count = Task.objects.filter(user=request.user).values('completed').aggregate(total=Count("id"))
        # print(all_count)

        form = TaskForm()

        return render(request, 'home.html', {
                                                'data':qs, 
                                                'completed_tasks': completed_tasks, 
                                                'pending_tasks': pending_tasks,
                                                'completed_count': completed_count,
                                                'pending_count': pending_count,
                                                'all_count': all_count,
                                                'form': form,
                                                })
    

    def post(self, request, *args, **kwargs):

        form = TaskForm(request.POST)

        if form.is_valid():

            form.instance.user = request.user

            form.save()

            messages.success(request, 'Task added.')
            
            return redirect('home')
        
        


@method_decorator(signin_required, name='dispatch')    
class TaskAddView(View):

    def get(self, request, *args, **kwargs):

        form = TaskForm()

        return render(request, 'task_add.html', {'form': form})
    
    def post(self, request, *args, **kwargs):

        form = TaskForm(request.POST)

        if form.is_valid():

            form.instance.user = request.user

            form.save()

            messages.success(request, 'Task Added')

            return redirect('home')
        
        messages.error(request, 'ERROR ! Task failed to add.')
    
        return render(request, 'task_add.html', {'form': form})
    



@method_decorator(signin_required, name='dispatch')
class TaskEditView(View):
    
    def get(self, request, *args, **kwargs):

        task_object = Task.objects.get(id=kwargs.get('pk'))

        form = TaskForm(instance=task_object)

        return render(request, 'task_edit.html', {'form': form})
    
    def post(self, request, *args, **kwargs):

        task_object = Task.objects.get(id=kwargs.get('pk'))

        form = TaskForm(request.POST, instance=task_object)

        if form.is_valid():

            form.save()

            messages.success(request, 'Task edited.')

            return redirect('home')
        
        messages.error(request, 'ERROR ! Task not updated.')

        return render(request, 'task_edit.html', {'form': form})
    
        

@method_decorator(signin_required, name='dispatch')    
class TaskDeleteView(View):

    def get(self, request, *args, **kwargs):

        Task.objects.get(id=kwargs.get('pk')).delete();

        messages.success(request, 'Task deleted.')

        return redirect('home')
    


# url: localhost:8000/register/
# method: get, post

class SignUpView(View):

    def get(self, request, *args, **kwargs):

        form = RegisterForm()

        return render(request, 'register.html', {'form': form})
    
    def post(self, request, *args, **kwargs):

        form = RegisterForm(request.POST)

        if form.is_valid():

            #User.objects.create_user(**form.cleaned_data)

            form.save()

            messages.success(request, 'User account created.')

            return redirect('signin')
        
        messages.error(request, 'ERROR ! Account not created, try again.')
        
        return render(request, 'register.html', {'form': form})
    



class SignInView(View):

    def get(self, request, *args, **kwargs):

        form = LoginForm()

        return render(request, 'login.html', {'form': form})
    
    def post(self, request, *args, **kwargs):

        form = LoginForm(request.POST)

        if form.is_valid():

            data = form.cleaned_data

            uname = data.get('username')

            pwd = data.get('password')

            user_object = authenticate(request, username=uname, password=pwd)

            if user_object:

                login(request, user_object)
                
                messages.success(request, 'Logged In')

                return redirect('home')
            
        messages.error(request, 'ERROR ! Login failed.')
        
        return render(request, 'login.html', {'form': form})
    



@method_decorator(signin_required, name='dispatch')
class SignOutView(View):

    def get(self, request, *args, **kwargs):

        logout(request)

        messages.success(request, 'Logged Out')

        return redirect('signin')
    