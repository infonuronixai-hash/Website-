import { Controller, Get, Render } from '@nestjs/common';
import { companyContent } from '../company-content';

@Controller()
export class PagesController {
  @Get()
  @Render('home')
  home() {
    return { title: 'Home', active: 'home', ...companyContent };
  }

  @Get('about')
  @Render('about')
  about() {
    return { title: 'About Us', active: 'about' };
  }

  @Get('team')
  @Render('team')
  team() {
    return { title: 'Our Team', active: 'team' };
  }

  @Get('vision-mission')
  @Render('vision-mission')
  visionMission() {
    return { title: 'Vision & Mission', active: 'vision-mission' };
  }

  @Get('solutions')
  @Render('solutions')
  solutions() {
    return { title: 'Technology & Product Focus', active: 'solutions' };
  }

  @Get('solutions/education')
  @Render('solutions-education')
  solutionsEducation() {
    return {
      title: 'AI-Powered Education & STEM',
      active: 'solutions',
    };
  }

  @Get('solutions/agriculture')
  @Render('solutions-agriculture')
  solutionsAgriculture() {
    return { title: 'AI for Agriculture', active: 'solutions' };
  }

  @Get('solutions/xr')
  @Render('solutions-xr')
  solutionsXr() {
    return { title: 'Extended Reality Solutions', active: 'solutions' };
  }

  @Get('solutions/enterprise')
  @Render('solutions-enterprise')
  solutionsEnterprise() {
    return { title: 'Enterprise Software Products', active: 'solutions' };
  }
}
