import { Component, OnInit } from "@angular/core";
import { LoginTokenService } from "src/app/shared/loginToken/login-token.service";
import {
  PayPalConfig,
  PayPalIntegrationType,
  PayPalEnvironment
} from "ngx-paypal";
import { of } from "rxjs";

@Component({
  selector: "app-pay-pal-test",
  templateUrl: "./pay-pal-test.component.html",
  styleUrls: ["./pay-pal-test.component.scss"]
})
export class PayPalTestComponent implements OnInit {
  PayPalConfig?: PayPalConfig;
  constructor(private loginToken: LoginTokenService) {}

  ngOnInit() {
    // hide the loading screen
    this.loginToken.LoadComplete(false);
    // init the paypal config
    this.initConfig();
  }

  private initConfig() {
    this.PayPalConfig = new PayPalConfig(
      PayPalIntegrationType.ClientSideREST,
      PayPalEnvironment.Sandbox,
      {
        commit: true,
        client: {
          sandbox:
            "ATG7W57vvxAWq8yRvnlmB3o4xukMkKM4gigMTGvavT8dVb087vyqzGP0e8cx-pOpsni_s7kI5mduT6BV"
        },
        button: {
          label: "paypal",
          layout: "vertical"
        },
        onAuthorize: (data, actions) => {
          console.log("authorized");
          return of(undefined);
        },
        onPaymentComplete: (data, actions) => {
          console.log("OnPaymentComplete", data);
        },
        onCancel: (data, actions) => {
          console.log("OnCancel");
        },
        onError: err => {
          console.log("OnError", err);
        },
        onClick: () => {
          console.log("onClick");
        },
        validate: actions => {
          console.log(actions);
        },
        experience: {
          noShipping: true,
          brandName: "Edugami Payment Test"
        },
        transactions: [
          {
            amount: {
              total: 20.0,
              currency: "USD"
            }
          }
        ],
        note_to_payer: "Contact us if you have troubles processing payment"
      }
    );
  }

  // eof
}
