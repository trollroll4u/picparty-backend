import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the User' })
    readonly name: string;
  
    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the User' })
    readonly email: string;
  
    @ApiProperty({ example: 'password123', description: 'The password of the User' })
    readonly password: string;
  
    constructor(name: string, email: string, password: string) {
      this.name = name;
      this.email = email;
      this.password = password;
    }
  }

export class UpdateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the User' })
    readonly name?: string;
  
    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the User' })
    readonly email?: string;
  
    @ApiProperty({ example: 'newpassword123', description: 'The new password of the User' })
    readonly password?: string;
  }