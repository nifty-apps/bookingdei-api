import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { RoomBookingFilter } from './dto/roombookingfilter.input';
import { UpdateRoomBookingInput } from './dto/update-roombooking.input';
import { RoomBooking, RoomBookingDocument } from './schemas/roombooking.schema';

@Injectable()
export class RoomBookingService {
  constructor(
    @InjectModel(RoomBooking.name)
    private roomBookingModel: Model<RoomBookingDocument>,
  ) {}

  findAll() {
    return this.roomBookingModel.find();
  }

  findOne(id: ObjectId) {
    return this.roomBookingModel.findById(id);
  }

  async findRoomBookings(roomBookingFilter: RoomBookingFilter) {
    const filter = {};
    if (roomBookingFilter.hotelId) {
      filter['hotel'] = roomBookingFilter.hotelId;
    }
    if (roomBookingFilter.startDate) {
      filter['checkIn'] = { $gte: roomBookingFilter.startDate };
    }
    if (roomBookingFilter.endDate) {
      filter['checkOut'] = { $lte: roomBookingFilter.endDate };
    }
    return this.roomBookingModel.find(filter);
  }

  update(id: ObjectId, updateRoomBookingInput: UpdateRoomBookingInput) {
    return this.roomBookingModel.findByIdAndUpdate(id, updateRoomBookingInput, {
      new: true,
    });
  }

  remove(id: ObjectId) {
    return this.roomBookingModel.findByIdAndDelete(id);
  }
}
