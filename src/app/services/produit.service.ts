import { Injectable } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { Produit } from '../model/produit.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategorieWrapper } from '../model/catgorieWrapped.model';
import { apiURL, apiURLCat } from '../config';
import { AuthService } from './auth.service';
import { Image } from "../model/image.model";

const httpOptions = {
headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  produits! : Produit[]; //un tableau de produits
  //categories : Categorie[];
  constructor(private http : HttpClient, 
    private authService:AuthService) { 
    
  }

  listeProduit(): Observable<Produit[]>{
   /* let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})*/
    return this.http.get<Produit[]>(apiURL+"/all");
    }

    ajouterProduit( prod: Produit):Observable<Produit>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
        return this.http.post<Produit>(apiURL+"/addprod", prod, {headers:httpHeaders});
      }

      supprimerProduit(id : number) {
        const url = `${apiURL}/delprod/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
          return this.http.delete(url,  {headers:httpHeaders});
        }

        
        consulterProduit(id: number): Observable<Produit> {
          const url = `${apiURL}/getbyid/${id}`;
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
            return this.http.get<Produit>(url,{headers:httpHeaders});
          }

          trierProduits(){
            this.produits = this.produits.sort((n1,n2) => {
              if (n1.idProduit > n2.idProduit) {
                  return 1;
              }
             if (n1.idProduit < n2.idProduit) {
                  return -1;
              }
            return 0;
          });
          }
      

          updateProduit(prod :Produit) : Observable<Produit>
            {
              console.log("prooooooooooood "+prod);
              console.log(prod.categorie);
                let jwt = this.authService.getToken();
                jwt = "Bearer "+jwt;
                let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
                  return this.http.put<Produit>(apiURL+"/updateprod", prod, {headers:httpHeaders});
            }

         
         
            listeCategories():Observable<CategorieWrapper>{
              let jwt = this.authService.getToken();
              jwt = "Bearer "+jwt;
              let httpHeaders = new HttpHeaders({"Authorization":jwt})
              return this.http.get<CategorieWrapper>(apiURLCat,{headers:httpHeaders});
              }

      /*   consulterCategorie(id:number): Categorie{
            return this.categories.find(cat => cat.idCat == id)!;
            } */

            rechercherParCategorie(idCat: number): Observable<Produit[]> {
              const url = `${apiURL}/prodscat/${idCat}`;
              let jwt = this.authService.getToken();
              jwt = "Bearer "+jwt;
              let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
              return this.http.get<Produit[]>(url,{headers:httpHeaders});
            } 
          
            rechercherParNom(nom: string):Observable< Produit[]> {
              const url = `${apiURL}/prodsByName/${nom}`;
              let jwt = this.authService.getToken();
              jwt = "Bearer "+jwt;
              let httpHeaders = new HttpHeaders({"Authorization":jwt})
              return this.http.get<Produit[]>(url,{headers:httpHeaders});
              }

              ajouterCategorie( cat: Categorie):Observable<Categorie>{
                let jwt = this.authService.getToken();
              jwt = "Bearer "+jwt;
              let httpHeaders = new HttpHeaders({"Authorization":jwt})
                return this.http.post<Categorie>(apiURLCat, cat,{headers:httpHeaders});
              }
              
              uploadImage(file: File, filename: string): Observable<Image>{
                const imageFormData = new FormData();
                imageFormData.append('image', file, filename);
                const url = `${apiURL + '/image/upload'}`;
                return this.http.post<Image>(url, imageFormData);
                }
        
        
                loadImage(id: number): Observable<Image> {
                  const url = `${apiURL + '/image/get/info'}/${id}`;
                  return this.http.get<Image>(url);
                  }
        
        
                  uploadImageProd(file: File, filename: string, idProd:number): Observable<any>{
                    const imageFormData = new FormData();
                    imageFormData.append('image', file, filename);
                    const url = `${apiURL + '/image/uplaodImageProd'}/${idProd}`;
                    return this.http.post(url, imageFormData);
              }
                    
                 supprimerImage(id : number) {
                  const url = `${apiURL}/image/delete/${id}`;
                  return this.http.delete(url, httpOptions);
                }
                  
        
                 uploadImageFS(file: File, filename: string, idProd : number): Observable<any>{
                    const imageFormData = new FormData();
                    imageFormData.append('image', file, filename);
                    const url = `${apiURL + '/image/uploadFS'}/${idProd}`;
                    return this.http.post(url, imageFormData);
                  }
        
        
}