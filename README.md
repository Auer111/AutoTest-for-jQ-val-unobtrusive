# AutoTest-for-jQ-val-unobtrusive
Run through and test validation on .NET apps that use jquery-validation unobtrusive

I am currently using this in a .NET CORE app.


To initialize this in your own project use:
```HTML+Razor
<environment names="Development,Testing">
@Html.PartialAsync("_Test").Result
</environment>
```

the autotest window will appear as a small bar on the left side of your screen.
To use just hover over it and it will expand.
