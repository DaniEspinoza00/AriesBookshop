import{a as b,b as B,c as L}from"./chunk-DIMOYPFG.js";import{g as C,j as y,k as x}from"./chunk-JNPL6XTF.js";import"./chunk-JHMITQKJ.js";import{Ab as m,Oa as l,W as c,_b as h,a as g,b as k,cb as d,eb as f,ib as S,jb as n,kb as a,lb as s,oa as p,vb as u,z as v}from"./chunk-7LFF63BH.js";function A(t,e){t&1&&(n(0,"div",6),s(1,"mat-spinner"),n(2,"span",7),u(3,"Loading..."),a()())}function D(t,e){if(t&1&&s(0,"app-book-card",8),t&2){let M=e.$implicit;f("item",M)}}var F=(()=>{let e=class e{constructor(){this.booksList=[],this.booksArray=[],this.isLoading=!1,this.BooklistService=p(C),this.BooksApiServiceService=p(b)}ngOnInit(){this.showBooks()}showBooks(){this.isLoading=!0,v({books:this.BooksApiServiceService.getBooks(),bookLists:this.BooklistService.getBookListkHttp()}).subscribe({next:({books:i,bookLists:o})=>{this.booksList=i.map(r=>{let j=o.find(_=>_.id===r.id);return k(g({},r),{booklist:j})}),this.isLoading=!1},error:i=>{console.log(i)}})}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["app-catalogue"]],standalone:!0,features:[m],decls:9,vars:2,consts:[[1,"section-container","container"],[1,"filter-container"],[1,"books-listing","d-flex","flex-column","justify-content-center"],["class","loading-container d-flex flex-column justify-content-center align-items-center"],[1,"grid-container","justify-content-center"],["class","product-card-price",3,"item",4,"ngFor","ngForOf"],[1,"loading-container","d-flex","flex-column","justify-content-center","align-items-center"],[2,"font-size","1.5rem"],[1,"product-card-price",3,"item"]],template:function(o,r){o&1&&(n(0,"section",0)(1,"div",1),s(2,"app-filters"),a(),n(3,"div",2),d(4,A,4,0,"div",3),n(5,"h4"),u(6,"Our books"),a(),n(7,"div",4),d(8,D,1,1,"app-book-card",5),a()()()),o&2&&(l(4),S(4,r.isLoading?4:-1),l(4),f("ngForOf",r.booksList))},dependencies:[h,B,L,x,y]});let t=e;return t})();var K=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["app-catalogue-page"]],standalone:!0,features:[m],decls:1,vars:0,template:function(o,r){o&1&&s(0,"app-catalogue")},dependencies:[F]});let t=e;return t})();export{K as CataloguePageComponent};
