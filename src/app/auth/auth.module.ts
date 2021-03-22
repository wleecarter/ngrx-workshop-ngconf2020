import { AuthEffects } from "./auth.effects";
import { EffectsModule } from "@ngrx/effects";
import { LoginPageComponentModule } from "./components/login-page";
import { NgModule } from "@angular/core";
import { UserComponentModule } from "./components/user";

@NgModule({
  imports: [EffectsModule.forFeature([AuthEffects])],
  exports: [LoginPageComponentModule, UserComponentModule],
})
export class AuthModule {}
