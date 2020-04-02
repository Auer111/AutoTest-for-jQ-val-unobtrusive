# AutoTest-for-jQ-val-unobtrusive
Run through and test validation on .NET apps that use jquery-validation unobtrusive

I am currently using this in a .NET CORE app.

To initialize this in your own project use

<environment names="Development,Testing">
		@Html.PartialAsync("_Test").Result
</environment>
