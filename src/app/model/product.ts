export class Product{
    static ENABLE = 1;
    static DISABLE= 2;
    static LOCK = 3;
    static PENDING = 4;
    static DELETE = 99;

    public idProduct: number | undefined;
    public name: string | undefined;
    public price: number | undefined;
    public urlImage: string | undefined;
    public description: string | undefined;
    public status: number | undefined;
    public createdAt: Date | undefined;
    public updatedAt: Date | undefined;

    public get getIdProduct(): number | undefined{
        return this.idProduct;
    }
    public set setIdProduct(idProduct: number | undefined){
        this.idProduct = idProduct;
    }
    public get getName(): string | undefined {
        return this.name;
    }
    public set setName(name: string | undefined){
        this.name = name;
    }
    public get getPrice(): number | undefined {
        return this.price;
    }
    public set setPrice(price: number | undefined){
        this.price = price;
    }

    public get getUrlImage(): string | undefined {
        return this.urlImage;
    }
    public set setUrlImage(urlImage: string | undefined){
        this.urlImage = urlImage;
    }

    public get getDescription(): string | undefined {
        return this.description;
    }
    public set setDescription(description: string | undefined){
        this.description = description;
    }
    public get getStatus(): number | undefined{
        return this.status;
    } 
    public set setStatus(status: number | undefined){
        this.status = status;
    }

    public get getCreatedAt(): Date | undefined {
        return this.createdAt;
    }
    public set setCreatedAt(createdAt: Date | undefined) {
        this.createdAt = createdAt;
    }

    public get getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }
    public set setUpdatedAt(updatedAt: Date | undefined) {
        this.updatedAt = updatedAt;
    }
}