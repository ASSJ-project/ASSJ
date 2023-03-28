package com.assj.utils;

import org.osgeo.proj4j.CRSFactory;
import org.osgeo.proj4j.CoordinateReferenceSystem;
import org.osgeo.proj4j.CoordinateTransform;
import org.osgeo.proj4j.CoordinateTransformFactory;
import org.osgeo.proj4j.ProjCoordinate;
import org.osgeo.proj4j.datum.Datum;
import org.osgeo.proj4j.io.Proj4FileReader;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class Wgs84ToWtmConverter {
    private static final String WGS84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
    private static final String WTMK = "+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9996 +x_0=400000 +y_0=600000 +ellps=bessel +units=m +no_defs";

    private static final CoordinateReferenceSystem wgs84 = new CRSFactory().createFromParameters("WGS84", WGS84);
    private static final CoordinateReferenceSystem wtmk = new CRSFactory().createFromParameters("WTM", WTMK);
    private static final CoordinateTransform transform = new CoordinateTransformFactory().createTransform(wgs84, wtmk);

    public static double[] convertWgs84ToWtm(double lat, double lon) {
        ProjCoordinate srcCoord = new ProjCoordinate(lon, lat);
        ProjCoordinate destCoord = new ProjCoordinate();
        transform.transform(srcCoord, destCoord);
        return new double[] { destCoord.x, destCoord.y };
    }
}
