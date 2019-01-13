import { Injectable } from "@angular/core";
import { UrlServiceService } from "../urlservice/url-service.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CourseModuleService {
  apiUrl: string;

  constructor(private http: HttpClient, private urlSvc: UrlServiceService) {
    this.apiUrl = urlSvc.apiUrl;
  }

  // Gets a list of ALL modules
  GetModules(): Observable<any> {
    return this.http.get(this.apiUrl + "/modules.getList");
  }

  ConfirmPurchaseOrder(module, data) {
    return this.http.post(this.apiUrl + "/modules.purchase", {
      module_id: module.id,
      gateway_data: data,
      price: module.price
    });
  }

  // eof
}
