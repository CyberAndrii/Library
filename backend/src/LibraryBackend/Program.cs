using FluentValidation.AspNetCore;
using LibraryBackend.Middlewares;
using static Microsoft.AspNetCore.HttpLogging.HttpLoggingFields;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddHttpLogging(options =>
    options.LoggingFields = RequestMethod | RequestHeaders | RequestQuery | RequestBody | ResponseBody);

builder.Services.AddCors(options => options
    .AddDefaultPolicy(policy => policy
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin()));

builder.Services
    .AddControllers()
    .AddFluentValidation(config => config.RegisterValidatorsFromAssemblyContaining<RateRequestValidator>());

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services
    .AddDbContext<AppDbContext>(b => b
        .UseInMemoryDatabase("books"));

builder.Services.AddSingleton<ErrorHandlerMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseCors();

app.UseHttpLogging(); // after swagger

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.SeedData();
app.Run();
