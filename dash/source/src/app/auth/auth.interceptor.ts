import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());

        if(localStorage.getItem('_token') != null) {
            const clonedReq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('_token'))
            });
            return next.handle(clonedReq)
                    .do(
                        succ => {},
                        err => {
                            if(err.status === 401)
                                this.router.navigateByUrl('/login');
                        }
                    );
        }
        else {
            this.router.navigateByUrl('/login');
        }
    }
}