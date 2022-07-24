import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  Approval,
  ApprovalForAll,
  Transfer,
  approvedToken
} from "../generated/Contract/Contract"
import { AlertSent } from "../generated/schema"

export function handleApproval(event: Approval): void {

  }


export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleTransfer(event: Transfer): void {
  let item = new AlertSent(event.params.tokenId.toString())
  item.user=event.params.to
  item.dateSent  = event.block.timestamp
  item.isAccepted= false
  item.save()
}

export function handleapprovedToken(event: approvedToken): void {
  let item = AlertSent.load(event.params.tokenId.toString())!
  item.isAccepted = true
  item.dateAccepted=event.block.timestamp
  item.quality = event.params.qualityReview
  item.save()

}
