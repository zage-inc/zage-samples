import zage
from django.http import JsonResponse
from rest_framework.views import APIView
from django.http.response import HttpResponse

# required: provide secret key before creating a payment token
zage.secret_key = "zage-test-key"


class CreateToken(APIView):
    def post(self, request):
        """
        zage.Payment.create_token() is a server side function to create a token to pay with Zage.

        Parameters:
            amount (int) [Required]: The amount to charge the user (in cents)
            on_success_endpoint (str) [Optional]: URI for a RESTful endpoint
                            to accept a POST call once the payment is succesfully created.
                            If this endpoint does not exist or throws errors when called the
                            payment will still go through.
            metadata (dict) [Optional]: Any internal metadata to be included in the payload
                            which will be returned via the POST to the on success endpoint.

        Returns:
            json_response_obj (dict): a dict with contents a json object with { token: [token] }

        """
        json_response_obj = zage.Payment.create_token(
            amount=1000,  # in cents (i.e. this is 10 dollars)
            on_success_endpoint="https://zage.app/on_success",  # optional: backend endpoint to be called on completion
            metadata={
                "a": "b",
                "c": "d",
            },  # optional:  internal metadata to be returned to the success endpoint
        )

        # return object to the frontend with payload: { token: [token] }
        # this token contains no sensitive information on the transaction
        return JsonResponse(json_response_obj)


# example on success endpoint: in this case it will simply print the payload returned once the transaction is completed
class OnSuccess(APIView):
    def post(self, request):
        print(request.data, flush=True)
        return HttpResponse("ok")
