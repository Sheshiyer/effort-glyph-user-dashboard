import type { 
  NFTMetadata, 
  ProjectContributions, 
  SkillSet,
  PerformanceMetrics,
  AttendanceRecord,
  NFTTrait 
} from '../types/nft';

export class NFTMetadataBuilder {
  private metadata: Partial<NFTMetadata> = {
    attributes: [],
  };

  setBasicInfo(name: string, description: string, image: string) {
    this.metadata.name = name;
    this.metadata.description = description;
    this.metadata.image = image;
    return this;
  }

  addProjectContributions(data: ProjectContributions) {
    this.metadata.project_contributions = data;
    this.addTraits([
      { trait_type: 'Project Name', value: data.project_name },
      { trait_type: 'Role', value: data.role },
      { trait_type: 'Achievements Count', value: data.achievements.length },
    ]);
    return this;
  }

  addSkillSet(data: SkillSet) {
    this.metadata.skill_set = data;
    this.addTraits([
      { trait_type: 'Primary Skill', value: data.primary_skill },
      { trait_type: 'Skill Level', value: data.skill_level },
      { trait_type: 'Secondary Skills Count', value: data.secondary_skills.length },
    ]);
    return this;
  }

  addPerformanceMetrics(data: PerformanceMetrics) {
    this.metadata.performance_metrics = data;
    this.addTraits([
      { 
        trait_type: 'Tasks Completed', 
        value: data.tasks_completed,
        display_type: 'number'
      },
      { 
        trait_type: 'Quality Score', 
        value: data.quality_score,
        display_type: 'percentage'
      },
    ]);
    return this;
  }

  addAttendanceRecord(data: AttendanceRecord) {
    this.metadata.attendance_record = data;
    this.addTraits([
      { 
        trait_type: 'Days Worked', 
        value: data.days_worked,
        display_type: 'number'
      },
      { 
        trait_type: 'Punctuality', 
        value: data.punctuality_percentage,
        display_type: 'percentage'
      },
    ]);
    return this;
  }

  private addTraits(traits: NFTTrait[]) {
    if (!this.metadata.attributes) {
      this.metadata.attributes = [];
    }
    this.metadata.attributes.push(...traits);
  }

  build(): NFTMetadata {
    if (!this.isValid()) {
      throw new Error('Invalid NFT metadata: Missing required fields');
    }
    return this.metadata as NFTMetadata;
  }

  private isValid(): boolean {
    return !!(
      this.metadata.name &&
      this.metadata.description &&
      this.metadata.image &&
      this.metadata.attributes?.length
    );
  }
}