package com.assj.utils;

import org.osgeo.proj4j.CRSFactory;
import org.osgeo.proj4j.CoordinateReferenceSystem;
import org.osgeo.proj4j.CoordinateTransform;
import org.osgeo.proj4j.CoordinateTransformFactory;
import org.osgeo.proj4j.ProjCoordinate;

public class Wgs84ToWtmConverter {
    private static final String EPSG_4326 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
    private static final String EPSG_5181 = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs";

    private static final CoordinateReferenceSystem wgs84 = new CRSFactory().createFromParameters("WGS84", EPSG_4326);
    private static final CoordinateReferenceSystem wtmk = new CRSFactory().createFromParameters("WTM", EPSG_5181);
    private static final CoordinateTransform transform = new CoordinateTransformFactory().createTransform(wgs84, wtmk);

    public static double[] convertWgs84ToWtm(double lat, double lon) {
        ProjCoordinate srcCoord = new ProjCoordinate(lon, lat);
        ProjCoordinate destCoord = new ProjCoordinate();
        transform.transform(srcCoord, destCoord);
        return new double[] { destCoord.x, destCoord.y };
    }
}
