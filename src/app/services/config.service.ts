import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';

@Injectable()
export class ConfigService {

  private _config: Object;
  private _env: Object;
  private _configCustom: Object;

  constructor(private http: Http) {
  }

  load() {
    return new Promise((resolve, reject) => {
      this.http.get('app/common/config/env.json')
        .map(res => res.json())
        .subscribe((env_data) => {
          this._env = env_data;
          this.http.get('app/common/config/' + env_data.env + '.json')
            .map(res => res.json())
            .catch((error: any) => {
              console.error(error);
              return Observable.throw(error.json().error || 'Server error');
            })
            .subscribe((data) => {
              this._config = data;
              resolve(true);
            });
        });

    });
  }

  getEnv(key: any) {
    return this._env[key];
  }

  get(key: any) {
    return this._config[key];
  }

  setCustom(key: any, val: any) {
    this._configCustom[key] = val;
  }

  getCustom(key: any) {
    return this._configCustom[key];
  }

};

