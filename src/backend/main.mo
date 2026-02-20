import Text "mo:core/Text";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Migration "migration";

(with migration = Migration.run)
actor {
  type GearReview = {
    gearName : Text;
    category : Text;
    brand : Text;
    rating : Nat8;
    reviewText : Text;
    reviewerName : Text;
    publicationDate : Int;
  };

  type MotorcycleReview = {
    model : Text;
    manufacturer : Text;
    year : Nat16;
    rating : Nat8;
    reviewText : Text;
    reviewerName : Text;
    publicationDate : Int;
  };

  type Vlog = {
    title : Text;
    description : Text;
    videoUrl : Text;
    thumbnailUrl : Text;
    publicationDate : Int;
    category : CategoryType;
    categoryTags : [Text];
  };

  type CategoryType = {
    #regular;
    #cinematics;
  };

  module GearReview {
    public func compare(a : GearReview, b : GearReview) : Order.Order {
      Int.compare(a.publicationDate, b.publicationDate);
    };
  };

  module MotorcycleReview {
    public func compare(a : MotorcycleReview, b : MotorcycleReview) : Order.Order {
      Int.compare(a.publicationDate, b.publicationDate);
    };
  };

  module Vlog {
    public func compare(a : Vlog, b : Vlog) : Order.Order {
      Int.compare(a.publicationDate, b.publicationDate);
    };
  };

  let gearReviews = Map.empty<Text, GearReview>();
  let motorcycleReviews = Map.empty<Text, MotorcycleReview>();
  let vlogs = Map.empty<Text, Vlog>();

  public shared ({ caller }) func addGearReview(gearName : Text, category : Text, brand : Text, rating : Nat8, reviewText : Text, reviewerName : Text) : async () {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5 stars");
    };

    let review : GearReview = {
      gearName;
      category;
      brand;
      rating;
      reviewText;
      reviewerName;
      publicationDate = Time.now();
    };
    gearReviews.add(gearName, review);
  };

  public shared ({ caller }) func addMotorcycleReview(model : Text, manufacturer : Text, year : Nat16, rating : Nat8, reviewText : Text, reviewerName : Text) : async () {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5 stars");
    };

    let review : MotorcycleReview = {
      model;
      manufacturer;
      year;
      rating;
      reviewText;
      reviewerName;
      publicationDate = Time.now();
    };
    motorcycleReviews.add(model, review);
  };

  public shared ({ caller }) func addVlog(title : Text, description : Text, videoUrl : Text, thumbnailUrl : Text, category : CategoryType, categoryTags : [Text]) : async () {
    let vlog : Vlog = {
      title;
      description;
      videoUrl;
      thumbnailUrl;
      publicationDate = Time.now();
      category;
      categoryTags;
    };
    vlogs.add(title, vlog);
  };

  public query ({ caller }) func getAllGearReviews() : async [GearReview] {
    gearReviews.values().toArray().sort();
  };

  public query ({ caller }) func getAllMotorcycleReviews() : async [MotorcycleReview] {
    motorcycleReviews.values().toArray().sort();
  };

  public query ({ caller }) func getAllVlogs() : async [Vlog] {
    vlogs.values().toArray().sort();
  };
};
