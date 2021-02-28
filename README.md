# :octocat: NestJS - GoogleActions handler module :octocat:

Web hook handling for your Google Actions
#### Getting Started

To install the module use

`npm i google-actions-handle @nestjs/core  @nestjs/common reflect-metadata`

#### Opportunity

Two decorators for handle google intent or pick property from response.

| Name  | Action |
|:------|:--------:|
|`@GoogleActionsIntent('Intent')`  <br>  `public handleMethod(parameters: GoogleActionsResponse)`| Handle specified intent into the decorated method |
|`@GoogleActionsParam('Intent')`  <br>  `public handleMethod(@GoogleActionsParam('handler.name') handlerName: string)`| Get the value of the property specified through the parameter decorator |
#### How to use? 

```ts
@Injectable()
export class MyGoogleActionsProvider {
    
    @GoogleActionsIntent('Intent')
    public async handleMyIntent(googleActionsResponse: GoogleActionsResponse): Promise<GoogleActionsFulfillmentResponse> {
        const response: GoogleActionsFulfillmentResponse;

        return response;
    }
}
```
You can use it to take a value from response including nesting.

```ts
@Injectable()
export class MyGoogleActionsProvider {
    
    @GoogleActionsIntent('Intent1')
    public async handleMyIntent1(@GoogleActionsParam('handler.name') handlerName: string): Promise<GoogleActionsFulfillmentResponse> {
        const response: GoogleActionsFulfillmentResponse;

        return response;   
    }
}

```
Module configuration, default url `https://your-url.com/web-hooks/google-actions`.

```ts
@Module({
    imports: [
        GoogleActionsModule.forRoot({
            basePath: 'web-hooks',
            postPath: 'google-actions'
        })
    ]
})
export class ApplicationModule { }
```

