from rest_framework import permissions
class IsAuthorOrReadOnly(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
    #(Authorがリクエストユーザー or 閲覧リクエスト) のみ許可
    return obj.author == request.user or request.method in permissions.SAFE_METHODS