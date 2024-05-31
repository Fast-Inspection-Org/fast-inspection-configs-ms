import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Se define el enum de los roles de usuario

export enum RolEnum {
    Administrador = "Administrador",
    Especialista = "Especialista Ing Civil",
    EspecialistaAvz = "Especialista Ing Civil Avanzado"
}

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ nullable: false, unique: true })
    nombreUsuario: string
    @Exclude()
    @Column({ nullable: false })
    contrasena: string
    @Column({ unique: true, nullable: false })
    email: string
    @Column({ nullable: true })
    rol: RolEnum
}
