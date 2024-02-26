from django.urls import path 

from mytodos import views



urlpatterns = [

    path('mytodos/home/', views.HomeView.as_view(), name='home'),

    path('mytodos/add/', views.TaskAddView.as_view(), name='task-add'),

    path('mytodos/<int:pk>/change/', views.TaskEditView.as_view(), name='task-edit'),

    path('mytodos/<int:pk>/remove/', views.TaskDeleteView.as_view(), name='task-delete'),

    path('mytodos/register/', views.SignUpView.as_view(), name='register'),

    path('', views.SignInView.as_view(), name='signin'),

    path('mytodos/signout/', views.SignOutView.as_view(), name='signout'),

]