import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity("db88_materials")
export class Material {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number = 0;

    @Column({ length: 32 })
    M_id: string = "";
    @Column({ length: 32 })
    Composition1: string = "";
    @Column({ length: 20 })
    Type_of_alloy: string = "";
    @Column({ length: 20 })
    Tensile_strength: string = "";
    @Column({ length: 20 })
    Yield_Strength: string = "";
    @Column({ length: 20 })
    Elongation_at_break: string = "";
    @Column({ length: 20 })
    Hardness: string = "";
    @Column({ length: 32 })
    Young_modulus: string = "";
    @Column({ length: 20 })
    Thermal_conductivity: string = "";
    @Column({ length: 20 })
    Solidus_temperature: string = "";
    @Column({ length: 20 })
    Liquidus_temperature: string = "";
    @Column({ length: 20 })
    Flexural_fatigue_strength: string = "";
    @Column({ length: 64 })
    Alloy_material: string = "";
    @Column({ length: 64 })
    Composition: string = "";
    @Column({ length: 20 })
    Cu: string = "";
    @Column({ length: 20 })
    Sn: string = "";
    @Column({ length: 20 })
    Zn: string = "";
    @Column({ length: 20 })
    Ni: string = "";
    @Column({ length: 20 })
    Pb: string = "";
    @Column({ length: 20 })
    Al: string = "";
    @Column({ length: 20 })
    Mn: string = "";
    @Column({ length: 20 })
    Fe: string = "";
    @Column({ length: 20 })
    Si: string = "";
    @Column({ length: 20 })
    Co: string = "";
    @Column({ length: 20 })
    C: string = "";
    @Column({ length: 20 })
    Cr: string = "";
    @Column({ length: 20 })
    Check_sum: string = "";
    @Column({ length: 20 })
    Price_ton: string = "";
    @Column({ length: 64 })
    Price_powder: string = "";
    @Column({ length: 64 })
    Application: string = "";
    @Column({ length: 20 })
    Tribology_Test: string = "";
    @Column({ length: 256 })
    notes: string = "";
}