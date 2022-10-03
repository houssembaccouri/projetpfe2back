import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateAnserDto } from './dto/create-anser.dto';
import { UpdateAnserDto } from './dto/update-anser.dto';
import { AnserEntity } from './models/anser.entity';
import { Anser } from './models/anser.interface';

@Injectable()
export class AnserService {

  constructor( 
    @InjectRepository(AnserEntity) private readonly anserRepository:Repository<AnserEntity>){}
  async create(anser: Anser): Promise<Anser> {
    try{
      const exists: Boolean= await this.trueAnserExists(anser.istrue);
    if(!exists){
      const newanser = await this.anserRepository.save(this.anserRepository.create(anser));
      return this.findAnser(newanser.id);
    }else {
      throw new HttpException('The correct answer already exists', HttpStatus.CONFLICT)
    }
    }catch{
      throw new HttpException('The correct answer already exists', HttpStatus.CONFLICT)
    }
    
    
  }


  private async findAnser (id: number): Promise<Anser>{
    return this.anserRepository.findOne(id);

}
  findAll() {
    return `This action returns all anser`;
  }

  private async trueAnserExists (istrue:boolean): Promise<Boolean>{
    const anser = await this.anserRepository.findOne({istrue});
    if(anser.istrue == true){
      return true;
    }else{
      return false;
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} anser`;
  }

  update(id: number, updateAnserDto: UpdateAnserDto) {
    return `This action updates a #${id} anser`;
  }

  remove(id: number) {
    return `This action removes a #${id} anser`;
  }
}
