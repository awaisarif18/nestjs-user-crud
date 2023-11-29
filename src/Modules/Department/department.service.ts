import { UpdateDepartmentDto } from '../../dto/department/update-department.dto';
import { CreateDepartmentDto } from '../../dto/department/create-department.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from '../../entities/department.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async createDepartment(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<InsertResult> {
    return await this.departmentRepository.insert(createDepartmentDto);
  }

  async findAll(): Promise<DepartmentEntity[]> {
    return await this.departmentRepository.find();
  }

  async findOne(id: number): Promise<DepartmentEntity> {
    return await this.departmentRepository.findOne({ where: { id } });
  }

  async updateDepartment(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<UpdateResult> {
    return await this.departmentRepository.update(id, updateDepartmentDto);
  }

  async removeDepartment(id: number): Promise<DeleteResult> {
    return await this.departmentRepository.delete(id);
  }
}

/*Regarding performance under load it depends entirely on what is being awaited. Async - await patterns give a performance benefit if the awaited function is blocked (e.g. by disk access), and there is other useful work that can be done e.g. another non-IO blocked request. This allows the main thread to hand off processing to another worker thread, and then return back to it later when done. This can be very beneficial to responsiveness, as the request processing threads can execute many more requests that are long running. That's the theory.

It should be said in the trivial example you give async await will probably perform much worse under high load, as the method must paused, added to a queue, pulled off, executed, and then returned. These are expensive operations. Some JIT engines will optimise these steps away. I do not know if NodeJS has all these optimisations yet.

In my experience these kind of optimisations are hard to see in practice on requests shorter than 50ms. Above that, you will likely be concurrency locked on IO at this point which means there are other optimisations that will benefit first. Normally this involves moving slower performing blocking requests into a distinct separate microservice/process, to avoid slowing the high performance queries.

Therefore I am unfashionable, and say given the extra code burden of the pattern, I think it rarely benefits projects and should be a late stage optimisation on key services, and avoided unless you know what you're doing. Unfortunately everyone seems to have drunk the async await cool-aid and use it everywhere... */
