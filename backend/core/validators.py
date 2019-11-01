from django.core.validators import RegexValidator


class MobilePhoneValidator(RegexValidator):
    regex = r'^\+?\d{1}[0-9\-]+[0-9]{1}$'
