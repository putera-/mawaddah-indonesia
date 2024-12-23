import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);


    const config = new DocumentBuilder()
        .setTitle('API Doc - Mawaddah Indonesia')
        .setDescription('Mawaddah Indonesia API Documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Class Validator
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    }));

    const appService = app.get(AppService);
    await appService.createPath('./public')
    await appService.createPath('./public/photos')
    await appService.createPath('./public/avatar')
    await appService.createPath('./public/blogs')
    await appService.createPath('./public/slides')

    // CORS
    app.enableCors({
        origin: ['https://mawaddahindonesia.albashiroh.com', 'http://localhost:3000', 'http://localhost:3001'],
        credentials: true
    });


    const port = process.env.PORT
    await app.listen(port);
    console.log(`App is running at http://localhost:${port}`)
}
bootstrap();
