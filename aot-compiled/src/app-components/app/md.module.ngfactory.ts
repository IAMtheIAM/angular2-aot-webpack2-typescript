/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
 /* tslint:disable */

import * as import0 from '@angular/core/src/linker/ng_module_factory';
import * as import1 from '../../../../src/app-components/app/md.module';
import * as import2 from '@angular/common/src/common_module';
import * as import3 from '@angular2-material/core/ripple/ripple';
import * as import4 from '@angular2-material/button/button';
import * as import5 from '@angular2-material/card/card';
import * as import6 from '@angular/common/src/localization';
import * as import7 from '@angular/core/src/di/injector';
import * as import8 from '@angular/core/src/i18n/tokens';
class MdModuleInjector extends import0.NgModuleInjector<import1.MdModule> {
  _CommonModule_0:import2.CommonModule;
  _MdRippleModule_1:import3.MdRippleModule;
  _MdButtonModule_2:import4.MdButtonModule;
  _MdCardModule_3:import5.MdCardModule;
  _MdModule_4:import1.MdModule;
  __LOCALE_ID_5:any;
  __NgLocalization_6:import6.NgLocaleLocalization;
  __TRANSLATIONS_FORMAT_7:any;
  constructor(parent:import7.Injector) {
    super(parent,[],[]);
  }
  get _LOCALE_ID_5():any {
    if ((this.__LOCALE_ID_5 == (null as any))) { (this.__LOCALE_ID_5 = (null as any)); }
    return this.__LOCALE_ID_5;
  }
  get _NgLocalization_6():import6.NgLocaleLocalization {
    if ((this.__NgLocalization_6 == (null as any))) { (this.__NgLocalization_6 = new import6.NgLocaleLocalization(this._LOCALE_ID_5)); }
    return this.__NgLocalization_6;
  }
  get _TRANSLATIONS_FORMAT_7():any {
    if ((this.__TRANSLATIONS_FORMAT_7 == (null as any))) { (this.__TRANSLATIONS_FORMAT_7 = (null as any)); }
    return this.__TRANSLATIONS_FORMAT_7;
  }
  createInternal():import1.MdModule {
    this._CommonModule_0 = new import2.CommonModule();
    this._MdRippleModule_1 = new import3.MdRippleModule();
    this._MdButtonModule_2 = new import4.MdButtonModule();
    this._MdCardModule_3 = new import5.MdCardModule();
    this._MdModule_4 = new import1.MdModule();
    return this._MdModule_4;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import2.CommonModule)) { return this._CommonModule_0; }
    if ((token === import3.MdRippleModule)) { return this._MdRippleModule_1; }
    if ((token === import4.MdButtonModule)) { return this._MdButtonModule_2; }
    if ((token === import5.MdCardModule)) { return this._MdCardModule_3; }
    if ((token === import1.MdModule)) { return this._MdModule_4; }
    if ((token === import8.LOCALE_ID)) { return this._LOCALE_ID_5; }
    if ((token === import6.NgLocalization)) { return this._NgLocalization_6; }
    if ((token === import8.TRANSLATIONS_FORMAT)) { return this._TRANSLATIONS_FORMAT_7; }
    return notFoundResult;
  }
  destroyInternal():void {
  }
}
export const MdModuleNgFactory:import0.NgModuleFactory<import1.MdModule> = new import0.NgModuleFactory(MdModuleInjector,import1.MdModule);