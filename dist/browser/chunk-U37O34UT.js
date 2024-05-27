import{b as I,g as C,h as w}from"./chunk-QDCBMGO5.js";import{$b as b,Ab as h,La as f,Oa as M,Pa as d,W as l,X as _,cb as z,da as c,ea as y,eb as u,jb as a,kb as t,lb as r,na as p,pb as v,vb as o}from"./chunk-7LFF63BH.js";var k=(()=>{let e=class e{};e.\u0275fac=function(s){return new(s||e)},e.\u0275mod=_({type:e}),e.\u0275inj=y({});let i=e;return i})();var D=(()=>{let e=class e{constructor(n){this.http=n}getKey(n){return this.http.get(`${w.urlApiKey}/${n}`,{responseType:"text"})}};e.\u0275fac=function(s){return new(s||e)(p(I))},e.\u0275prov=c({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();function S(i,e){if(i&1&&r(0,"iframe",20),i&2){let E=v();u("src",E.mapUrl,f)}}var L=(()=>{let e=class e{constructor(n,s){this.keysService=n,this.sanitizer=s,this.mapUrl=null}ngOnInit(){this.keysService.getKey("Google").subscribe({next:n=>{this.loadGoogleMapsApi(n)},error:n=>{console.log(n)}})}loadGoogleMapsApi(n){let g=`https://www.google.com/maps/embed/v1/place?q=place_id:${encodeURIComponent("Ek0yNSBkZSBNYXlvIDMxMDgsIEI3NjAwR1dOIE1hciBkZWwgUGxhdGEsIFByb3ZpbmNpYSBkZSBCdWVub3MgQWlyZXMsIEFyZ2VudGluYSIxEi8KFAoSCR08ipgB3ISVERcciMdTu6cPEKQYKhQKEglzLeruVdiElRGHxHIV_bNniA")}&key=${n}`;this.mapUrl=this.sanitizer.bypassSecurityTrustResourceUrl(g);let O=document.getElementById("maps-script");O.src=`https://maps.googleapis.com/maps/api/js?key=${n}&callback=initMap`}};e.\u0275fac=function(s){return new(s||e)(d(D),d(C))},e.\u0275cmp=l({type:e,selectors:[["app-contact"]],standalone:!0,features:[h],decls:45,vars:1,consts:[[1,"container","mt-5"],[1,"contact","row","d-flex","justify-content-evenly","mt-3","mb-5"],[1,"contact-form","col-md-6"],[1,"mb-3"],["for","exampleInputName",1,"form-label"],["type","text","id","exampleInputName","aria-describedby","emailHelp",1,"form-control"],["for","exampleInputLastname",1,"form-label"],["type","text","id","exampleInputLastname",1,"form-control"],["for","exampleInputEmail",1,"form-label"],["type","email","id","exampleInputEmail",1,"form-control"],["for","exampleInputTextarea",1,"form-label"],["id","exampleInputTextarea","rows","3",1,"form-control"],["type","submit",1,"send-button","btn"],[1,"contact-details","d-flex","flex-column","justify-content-center","align-items-center","col-md-6"],["src","./assets/images/aries-image.png","alt","","height","80"],[1,"d-flex","flex-column"],[1,"bi","bi-telephone-fill"],[1,"bi","bi-envelope"],[1,"bi","bi-geo-alt-fill"],["width","100%","height","400","style","border:0; margin-bottom: 3rem;","loading","lazy","allowfullscreen","",3,"src",4,"ngIf"],["width","100%","height","400","loading","lazy","allowfullscreen","",2,"border","0","margin-bottom","3rem",3,"src"]],template:function(s,g){s&1&&(a(0,"section",0)(1,"h4"),o(2,"Contact"),t(),a(3,"div",1)(4,"div",2)(5,"p"),o(6,"Your Consult"),t(),a(7,"form")(8,"div",3)(9,"label",4),o(10,"Name"),t(),r(11,"input",5),t(),a(12,"div",3)(13,"label",6),o(14,"Lastname"),t(),r(15,"input",7),t(),a(16,"div",3)(17,"label",8),o(18,"Email"),t(),r(19,"input",9),t(),a(20,"div",3)(21,"label",10),o(22,"Your consult"),t(),r(23,"textarea",11),t(),a(24,"button",12),o(25,"Send"),t()()(),a(26,"div",13),r(27,"img",14),a(28,"ul",15)(29,"li")(30,"span"),r(31,"i",16),t(),a(32,"span"),o(33,"(0223) 456-7890"),t()(),a(34,"li")(35,"span"),r(36,"i",17),t(),a(37,"span"),o(38,"ariesbookshop@email.com"),t()(),a(39,"li")(40,"span"),r(41,"i",18),t(),a(42,"span"),o(43,"25 de Mayo 3108 - Mar del Plata"),t()()()()(),z(44,S,1,1,"iframe",19),t()),s&2&&(M(44),u("ngIf",g.mapUrl))},dependencies:[k,b],styles:["label[_ngcontent-%COMP%]{font-family:Alef,sans-serif;font-size:.9rem}ul[_ngcontent-%COMP%]{list-style-type:none}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:20px}span[_ngcontent-%COMP%]{font-family:Rubik,sans-serif;font-size:larger}span[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{padding-right:15px}.send-button[_ngcontent-%COMP%]{background-color:#432f2f;color:#fffc}.send-button[_ngcontent-%COMP%]:hover{color:#fff}@media screen and (max-width:767px){.contact-details[_ngcontent-%COMP%]{margin-top:3rem}}"]});let i=e;return i})();var X=(()=>{let e=class e{};e.\u0275fac=function(s){return new(s||e)},e.\u0275cmp=l({type:e,selectors:[["app-contact-page"]],standalone:!0,features:[h],decls:1,vars:0,template:function(s,g){s&1&&r(0,"app-contact")},dependencies:[L]});let i=e;return i})();export{X as ContactPageComponent};
