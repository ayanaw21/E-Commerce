from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = (
        "id", "email", "first_name", "last_name",
        "is_google_account", "is_verified",
        "is_active", "is_staff", "is_admin", "is_superuser",
        "created_at", "updated_at",
    )
    list_filter = (
        "is_google_account", "is_verified", "is_active",
        "is_staff", "is_admin", "is_superuser",
    )
    search_fields = ("email", "first_name", "last_name")
    ordering = ("email",)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name", "profile_image")}),
        ("Permissions", {
            "fields": (
                "is_active", "is_staff", "is_admin", "is_superuser",
                "groups", "user_permissions",
            )
        }),
        ("Google Login Info", {"fields": ("is_google_account", "is_verified")}),
        ("Important dates", {"fields": ("last_login", "created_at", "updated_at")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "first_name", "last_name", "password1", "password2"),
        }),
    )

    readonly_fields = ("created_at", "updated_at")

