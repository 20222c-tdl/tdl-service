import { ApiProperty } from "@nestjs/swagger";
import { ClaimStatus } from "../../../domain/entities/claims/claim.entity.status";


export class UpdateClaimStatusDTO {
  @ApiProperty({ enum: ClaimStatus, description: 'Claim status' })
  status: ClaimStatus;
}