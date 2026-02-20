import Map "mo:core/Map";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Nat16 "mo:core/Nat16";

module {
  type OldActor = {
    reviews : Map.Map<Text, GearReview>;
  };

  type GearReview = {
    gearName : Text;
    category : Text;
    brand : Text;
    rating : Nat8;
    reviewText : Text;
    reviewerName : Text;
    publicationDate : Int;
  };

  type NewActor = {
    gearReviews : Map.Map<Text, GearReview>;
    motorcycleReviews : Map.Map<Text, MotorcycleReview>;
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

  public func run(old : OldActor) : NewActor {
    {
      gearReviews = old.reviews;
      motorcycleReviews = Map.empty<Text, MotorcycleReview>();
    };
  };
};
